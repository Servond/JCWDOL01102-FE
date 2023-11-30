export const validatePermissions = (
  userPermissions?: string[],
  toValidate?: string[]
) => {
  if (!userPermissions || !toValidate) return false;
  const permissionValid = toValidate.every((value) =>
    userPermissions.includes(value)
  );
  return permissionValid;
};
