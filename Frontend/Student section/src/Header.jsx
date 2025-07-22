import { Link } from "react-router";
import Icon from "./Icon";
const Header = () => {
    const navLinks = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Courses', path: '/courses' },
        { name: 'Timetable', path: '/timetable' },
        { name: 'Marks', path: '/marks' },
        { name: 'Feedback', path: '/feedback' },
        { name: 'Settings', path: '/settings' },
    ];

    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-xl font-semibold text-gray-800">CDAC ACTS</h1>
                <nav className="hidden md:flex items-center space-x-6">
                    {navLinks.map(link => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={location.pathname === link.path ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <button className="text-gray-600 hover:text-blue-600">
                        <Icon name="notifications" />
                    </button>
                    <img alt="User avatar" className="h-10 w-10 rounded-full" src="https://placehold.co/40x40/E2E8F0/4A5568?text=U" />
                </nav>
                 <button className="md:hidden text-gray-600">
                    <Icon name="menu" />
                </button>
            </div>
        </header>
    );
};

export default Header;