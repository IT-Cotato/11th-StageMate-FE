interface CategoryBadgeProps {
  text: string;
  variant?: 'default' | 'editor';
}
const CategoryBadge = ({text, variant = 'default'}: CategoryBadgeProps) => {
  const isEditor = variant === 'editor';

  return (
    <div
      style={{
        width: '62px',
        height: '40px',
        backgroundColor: isEditor ? '#FFFFFF' : '#836DE4',
        color: isEditor ? '#7B4CFA' : '#FFFFFF',
        fontWeight: 'bold',
        fontSize: '15px',
        fontFamily: 'Roboto, sans-serif',
        borderRadius: '50% / 50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: isEditor ? '1px solid #7B4CFA' : 'none',
      }}>
      {text}
    </div>
  );
};

export default CategoryBadge;
