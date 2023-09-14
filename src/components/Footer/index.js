import './styled.css';

function Footer() {
  return (
    <div className="FooterWrapper">
      <p className="FooterTitle">
        Тестовое задание выполнил{' '}
        <a className="FooterLink" href="https://github.com/tragislav">
          Дыкоменко Станислав Андреевич
        </a>
      </p>
    </div>
  );
}

export default Footer;
