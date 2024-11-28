export const extractErrorMessage = (error: any): string => {
    if (error?.data) {
      if (typeof error.data === 'object' && !Array.isArray(error.data)) {
        const serverErrors = Object.entries(error.data)
          .map(([field, messages]) => {
            return (Array.isArray(messages) ? messages : [messages])
              .map((message: string) => `${field.charAt(0).toUpperCase() + field.slice(1)}: ${message}`)
              .join(', ');
          })
          .join(', ');
      
        return serverErrors || 'Failed to log in. Please try again.';
      }
    }
    return 'Failed to log in. Please try again.';
  };