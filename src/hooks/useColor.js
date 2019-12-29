import { useRef, useEffect } from 'react';
import { useTheme } from 'styled-components/macro';
import { useRouteTransition, useAppContext } from '.';

function useColor(color) {
  const { status } = useRouteTransition();
  const { dispatch } = useAppContext();
  const theme = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    if ((status === 'entered' || status === 'exiting')) {
      dispatch({
        type: 'updateTheme', value: {
          colorPrimary: theme.id === 'dark'
            ? color
            : themeRef.current.colorPrimary,
          colorAccent: color,
        }
      });
    }

    return function cleanUp() {
      if (status !== 'entered') {
        dispatch({ type: 'updateTheme' });
      }
    };
  }, [dispatch, status, theme.id, color]);
}

export default useColor;
