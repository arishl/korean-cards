// theme.js
import { extendTheme, } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#2D3748', // Adjust the hex color code to your desired greyish-blue shade
      },
    },
  },
});


  export {
    theme
  }