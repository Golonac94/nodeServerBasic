import { z } from 'zod';

const registerSchema = z.object({
    username: z.string()
        .min(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' })
        .max(30, { message: 'El nombre de usuario no puede superar los 30 caracteres' }),
    
    email: z.string()
        .email({ message: 'Debe ser un correo válido' }),
    
    password: z.string()
        .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),

    provider: z.enum(['native', 'google', 'facebook', 'apple'], {
        invalid_type_error: 'El proveedor de autenticación debe ser uno de: native, google, facebook o apple',
    }).default('native'),

    phone: z.string()
        .min(9, { message: 'Aun no se como verificar telefono' }),

    role_id: z.number()
        .int({ message: 'El ID del rol debe ser un número entero' })
        .positive({ message: 'El ID del rol debe ser un número positivo' })
        .default(1)
});

export function validateUser(input) {
    return registerSchema.safeParse(input);
}
