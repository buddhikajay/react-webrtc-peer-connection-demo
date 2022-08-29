interface ButtonProps {
  text: string;
  onClick: any;
}

const ButtonComponent = ({text, onClick}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
    >
      {text || 'Click Here'}
    </button>
  )
}

export default ButtonComponent;