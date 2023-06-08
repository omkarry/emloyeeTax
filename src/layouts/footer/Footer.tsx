import "../../assets/css/Footer.css"

export default function Footer() {
  return (
    <div className='bg-dark footer text-center text-lg-start text-muted d-flex align-items-center'>
      <div className='text-center mx-auto' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2021 Copyright :
        <a className='text-reset fw-bold' href='/'>
          IncubXperts Technoconsulting Pvt Ltd
        </a>
      </div>
    </div>
  );
}