export default function ProjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <h1 className="p-4 bg-blue-600 text-white">Project Details</h1>
            {children}
        </div>
    );
}
