const hidePartOfEmail = (email) => {
    const emailFirstPartLength = email.indexOf('@');
    return email.slice(0, 1) +
        '*'.repeat(emailFirstPartLength - 2) +
        email.slice(emailFirstPartLength - 1, emailFirstPartLength) +
        email.slice(emailFirstPartLength + 1, email.length);
}

module.exports.hidePartOfEmail = hidePartOfEmail;