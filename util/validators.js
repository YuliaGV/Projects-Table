module.exports.validateRegisterInput = (
    pin,
    name,
    lastName,
    email,
    password, 
    confirmPassword, 
    role
) => {
    const errors = {};

    if (pin.trim() === '') {
        errors.pin = 'El documento de identidad no puede estar vacío';
      }

    if (name.trim() === '') {
      errors.name = 'El nombre no puede estar vacío';
    }

    if (lastName.trim() === '') {
        errors.lastName = 'El apellido no puede estar vacío';
      }

    if (email.trim() === '') {
      errors.email = 'El email no puede estar vacío';
    } else {
      const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
      if (!email.match(regEx)) {
        errors.email = 'Email no válido';
      }
    }

    if (password === '') {
      errors.password = 'La contraseña no puede estar vacía';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (role.trim() === '') {
        errors.role = 'Debe indicarse un rol para el usuario';
    }
  
    return {
      errors,
      valid: Object.keys(errors).length < 1
    };
  };
  
module.exports.validateLoginInput = (email, password) => {
    const errors = {};
    if (email.trim() === '') {
      errors.email = 'El email no puede estar vacío';
    }
    if (password.trim() === '') {
      errors.password = 'La contraseña no puede estar vacía';
    }
  
    return {
      errors,
      valid: Object.keys(errors).length < 1
    };
};