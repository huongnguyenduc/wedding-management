import NumberFormat from 'react-number-format';
function NumberFormatCustom(props) {
  const {inputRef,name, onChange, ...other } = props;

  
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: name,
            value: values.value,
          },
        });
      }}
      thousandSeparator=" "
      isNumericString
      suffix="đ"
    />
  );
}

export default NumberFormatCustom;