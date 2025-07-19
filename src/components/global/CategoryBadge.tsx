interface CategoryBadgeProps {
  text: string;
}
const CategoryBadge = ({text}: CategoryBadgeProps) => {
  return (
    <div
      style={{
        width: '62px',
        height: '40px',
        backgroundColor: '#836DE4',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '15px',
        fontFamily: 'Roboto, sans-serif',
        borderRadius: '50% / 50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {text}
    </div>
  );
};

export default CategoryBadge;
