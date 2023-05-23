import Link from 'next/link'

interface ArticleProps {
    title: string
    icon: React.ReactNode
    link: string
}

const Article = ({ title, icon, link }: ArticleProps) => {
    return (
        <Link href={link} passHref>
            <a href="replace">
                <article className="p-4 shadow border border-slate-300 rounded-md transition-shadow duration-150 hover:shadow-md hover:shadow-fuchsia-300 hover:border-fuchsia-300">
                    <header className="flex items-center space-x-2 text-slate-700">
                        {icon}
                        <h2 className="text-base">{title}</h2>
                    </header>
                </article>
            </a>
        </Link>
    )
}

export default Article
