export const Rowidentitie = ({ identitie }) => {
  return Object.keys(identitie).map((keyName, i) => (
    <td key={i}> {identitie[keyName]}</td>
  ));
};
