import { Button as MButton } from '@mui/material';

export default function Button({ children, variant = 'contained', color = 'primary', ...props }) {
  return (
    <MButton variant={variant} color={color} {...props} sx={{ px: 2.5, py: 1.1, ...props.sx }}>
      {children}
    </MButton>
  );
}
