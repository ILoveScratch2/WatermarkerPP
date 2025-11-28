import packageJson from '../../package.json';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span>
          <a 
            href="https://github.com/ILoveScratch2/WatermarkerPP" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Watermarker++ by ILoveScratch
          </a>
          {' '}v{packageJson.version}
        </span>
        <span>
          Licensed under{' '}
          <a 
            href="https://github.com/ILoveScratch2/WatermarkerPP/blob/main/LICENSE" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            GNU AGPL v3.0
          </a>
        </span>
      </div>
    </footer>
  );
}
