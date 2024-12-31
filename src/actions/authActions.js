export const setUser  = (user) => {
    return {
      type: 'auth/setUser ',
      payload: {
        uid: user.uid,
        providerId: user.providerId,
        email: user.email, 
        
      },
    };
  };