import { portfolioData } from '../../data/portfolio'

const Footer = () => {
    return (
        <footer className="py-12 border-t border-border bg-card/50">
            <div className="container">
                <div className="text-center text-secondary text-sm">
                    <p>© {new Date().getFullYear()} {portfolioData.name}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
