export const getPreviousYear = (): number => {
    const date = new Date();
    return date.getFullYear() - 1;
  };
  