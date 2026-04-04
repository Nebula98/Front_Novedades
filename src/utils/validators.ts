export function validateStudentCode(code: string): string | null {
    if (!code.trim()) return 'El codigo estudiantil es requerido';
    if (!/^\d{5,}$/.test(code.trim())) return 'El codigo debe tener al menos 5 digitos numericos.';
    return null;
}

export function validatePassword(password: string): string | null {
    if (!password) return 'La contraseña es requerida.';
    if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres.';
    return null;
}

export function validateNewPassword(password: string): string | null {
  if (!password) return 'La nueva contraseña es requerida.'
  if (password.length < 8) return 'Debe tener al menos 8 caracteres.'
  if (!/[A-Z]/.test(password)) return 'Debe incluir al menos una mayúscula.'
  if (!/[0-9]/.test(password)) return 'Debe incluir al menos un número.'
  return null
}

export function validatePasswordMatch(password: string, confirm: string): string | null {
  if (!confirm) return 'Debes confirmar la contraseña.'
  if (password !== confirm) return 'Las contraseñas no coinciden.'
  return null
}

export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}