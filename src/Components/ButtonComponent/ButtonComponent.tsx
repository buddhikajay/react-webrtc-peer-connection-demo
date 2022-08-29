interface IButtonProps {
  text: string;
  onClick: any;
}

const ButtonComponent = ({text, onClick}: IButtonProps) => {
  return (
    <button
      onClick={onClick}
    >
      {text || 'Click Here'}
    </button>
  )
}

export default ButtonComponent;