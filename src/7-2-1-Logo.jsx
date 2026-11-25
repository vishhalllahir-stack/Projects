import './7-2-Accessories.css';
export default function ToyotaLogo () {

    return(
        <>
        
        {/* Left - Logo (original image placed in src/assets/toyota-logo.png) */}
        <div className="accLogoBox">
            {/* Using the user-provided logo URL. If loading fails it falls back to the local SVG in public/. */}
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy5ClgjkDEEg7kh34zh8ujss6YjvPmXpPHiVK0nCmjfA&s=10"
              alt="Toyota logo"
              className="accLogo"
              onError={(e) => (e.currentTarget.src = '/toyota-logo.svg')}
            />
        </div>
        
        </>
    )
}