import Link from 'next/link';
import './style.css'
const Breadcrumbs = ({ paths }) => {
  return (
    <nav className="flex breadcrumb-wrapper" aria-label="Breadcrumb">
      {paths.map((path, index) => (
        <span key={index} className='text-sm'>
          <Link href={path.url} className="breadcrumb-link">
            {path.label}
          </Link>
          {index < paths.length - 1 && (
           <span className='seperator'>/</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
