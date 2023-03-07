function BottomNav() {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">how it works</a>
            </div>
            <div className="flex-none gap-2">
                <div className="flex-1">
                    {/* here the twitter link will go*/}
                    <a className="btn btn-ghost text-xl fa-brands fa-twitter big-twitter" href='https://twitter.com/intent/tweet' target="_blank" rel="noopener noreferrer"></a> 
                </div>
            </div>
        </div>
    )
}

export default BottomNav;