import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import * as model from "../models/users.model.js";

// ============================
// VERIFICAR SESIÓN ABIERTA
// ============================
export const verifySesionOpen = (req, res) => {
    res.status(202).json({ message: "estamos en sesion" });
};

// ============================
// REGISTRO
// ============================
export const register = async (req, res) => {
    try {
        const { Nombre, Apellido, Email, Telefono, Pass } = req.body;

        // validar campos del front
        if (!Nombre || !Email || !Pass) {
            return res.status(422).json({ message: "Nombre, email y contraseña requeridos" });
        }

        // verificar si existe el mail
        const exists = await model.getUserByEmail(Email);

        if (exists.errno) {
            return res.status(500).json({ message: `Error verificando usuario existente: ${exists.errno}` });
        }

        if (exists[0]) {
            return res.status(409).json({ message: "Este correo ya se encuentra registrado" });
        }

        // hashear pass
        const passwordHash = await bcrypt.hash(Pass, 10);

        // ADAPTACIÓN A TU BASE DE DATOS:
        const userToInsert = {
            Name: Nombre,         // renombrado
            Email,
            Pass: passwordHash,
            Image: "",            // obligatorio en BD
            Type_user: 1,         // obligatorio en BD
            // Apellido ignorado (no existe en BD)
            // Telefono ignorado (no existe en BD)
        };

        // insertar usuario
        const rows = await model.createUser(userToInsert);

        if (rows.errno) {
            return res.status(500).json({ message: `Error creando usuario: ${rows.errno}` });
        }

        return res.status(201).json({
            message: "Usuario creado exitosamente",
            id: rows.insertId
        });

    } catch (error) {
        console.log("REGISTER ERROR:", error);
        return res.status(500).json({ message: "Error interno en el servidor", error });
    }
};


// ============================
// LOGIN
// ============================
export const login = async (req, res) => {
    try {
        const { Email, Pass } = req.body;

        if (!Email || !Pass) {
            return res.status(422).json({ message: "email y contraseña requeridos" });
        }

        const user = await model.getUserByEmail(Email);

        if (user.errno) {
            return res.status(500).json({ message: `Error buscando usuario: ${user.errno}` });
        }

        if (!user[0]) {
            return res.status(401).json({ message: "Credenciales invalidas" });
        }

        const valid = await bcrypt.compare(Pass, user[0].Pass);

        if (!valid) {
            return res.status(401).json({ message: "Credenciales invalidas" });
        }

        const payload = {
            id: user[0].ID_user,
            name: user[0].Name,      
            type: user[0].Type_user
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60,
        });

        return res.status(202).json({
            message: "sesion iniciada",
            token,
            data: user[0].Name,
        });
    } catch (error) {
        return res.status(500).json({ message: "Error interno en el servidor", error });
    }
};

// ============================
// LOGOUT
// ============================
export const logout = (req, res) => {
    res.clearCookie("access_token").json({ message: "session cerrada" });
};

// ============================
// MOSTRAR CUENTA
// ============================
export const showAccount = async (req, res) => {
    const rows = await model.getUserById(req.user.id);

    if (rows.errno) {
        return res.status(500).json({ message: `Error en consulta ${rows.errno}` });
    }

    if (!rows[0]) {
        return res.status(404).json({ message: "El usuario no existe" });
    }

    res.json(rows[0]);
};

// ============================
// ACTUALIZAR CUENTA
// ============================
export const updateAccount = async (req, res) => {
    try {
        const data = {
            Name: req.body.Name,
            Email: req.body.Email
        };

        // Si mandaron nueva contraseña
        if (req.body.Pass && req.body.Pass.trim() !== "") {
            data.Pass = req.body.Pass;
        }

        // Si mandaron nueva imagen
        if (req.file) {
            data.Image = "image_users/" + req.file.filename;
        }

        const rows = await model.updateUser(req.user.id, data);

        if (rows.errno) {
            return res.status(500).json({ message: `Error en consulta ${rows.errno}` });
        }

        if (rows.affectedRows === 0) {
            return res.status(404).json({ message: "El usuario no existe" });
        }

        res.json({ message: "datos actualizados" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error del servidor" });
    }
};

// ============================
// CAMBIAR CONTRASEÑA
// ============================
export const setPassword = async (req, res) => {
    const { Pass } = req.body;

    if (!Pass) {
        return res.status(422).json({ message: "Nueva contraseña requerida" });
    }

    const passwordHash = await bcrypt.hash(Pass, 10);
    req.body.Pass = passwordHash;

    const rows = await model.updateUser(req.user.id, req.body);

    if (rows.errno) {
        return res.status(500).json({ message: `Error en consulta ${rows.errno}` });
    }

    if (rows.affectedRows === 0) {
        return res.status(404).json({ message: "El usuario no existe" });
    }

    res.clearCookie("access_token").json({ message: "Contraseña actualizada" });
};

// ============================
// ELIMINAR CUENTA
// ============================
export const deleteAccount = async (req, res) => {
    const rows = await model.deleteUser(req.user.id);

    if (rows.errno) {
        return res.status(500).json({ message: `Error en consulta ${rows.errno}` });
    }

    if (rows.affectedRows === 0) {
        return res.status(404).json({ message: "El usuario no existe" });
    }

    res.clearCookie("access_token").json({ message: "Cuenta eliminada" });
};

// ============================
// SUBIR IMAGEN
// ============================
export const uploadImage = async (req, res) => {
    let Image = null;

    if (req.file) {
        Image = req.file.filename;
    }

    const rows = await model.updateUser(req.user.id, { Image });

    if (rows.errno) {
        return res.status(500).json({ message: `Error en consulta ${rows.errno}` });
    }

    if (rows.affectedRows === 0) {
        return res.status(404).json({ message: "El usuario no existe" });
    }

    res.json({ message: "Imagen actualizada" });
};
