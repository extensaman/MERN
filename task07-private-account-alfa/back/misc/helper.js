const hidePartOfEmail = (email) => {
  const emailFirstPartLength = email.indexOf("@");
  if (emailFirstPartLength > 1) {
    return (
      email.slice(0, 1) +
      "*".repeat(emailFirstPartLength - 2) +
      email.slice(emailFirstPartLength - 1, emailFirstPartLength) +
      email.slice(emailFirstPartLength + 1, email.length)
    );
  } else {
    return email;
  }
};

module.exports.hidePartOfEmail = hidePartOfEmail;
