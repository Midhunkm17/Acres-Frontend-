import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <div>
          
  <footer class="site-footer text-white">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <h6>About</h6>
          <p class="text-justify"><span className='hdng fs-5 font-medium'>Acres</span><i> Build your dream with us! </i><br/>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id, dolor quas nihil culpa dolores, odit iste atque adipisci earum inventore aut porro error vero quos aliquid mollitia veniam laborum minima.</p>
        </div>

        <div class="col-xs-6 col-md-3">
          <h6>Categories</h6>
          <ul class="footer-links">
            <li><a href="">Premium Villas</a></li>
            <li><a href="">Budget Villas</a></li>
            <li><a href="">Commercial Buildings</a></li>
            <li><a href="">Sports</a></li>
            <li><a href="">Land Plots</a></li>
            <li><a href="">Furnished House</a></li>
          </ul>
        </div>

        <div class="col-xs-6 col-md-3">
          <h6>Quick Links</h6>
          <ul class="footer-links">
            <li><a href="">About Us</a></li>
            <li><a href="">Contact Us</a></li>
            <li><a href="">Contribute</a></li>
            <li><a href="">Privacy Policy</a></li>
            <li><a href="">Sitemap</a></li>
          </ul>
        </div>
      </div>
      <hr/>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-sm-6 col-xs-12">
          <p class="copyright-text">Copyright &copy; 2023 All Rights Reserved by 
       <a href="#"> Acres</a>.
          </p>
        </div>

        <div class="col-md-4 col-sm-6 col-xs-12">
          <ul class="social-icons">
            <li><a class="facebook" href="#"><i class="fa-brands fa-facebook"></i></a></li>
            <li><a class="twitter" href="#"><i class="fa-brands fa-x-twitter"></i></a></li>
            <li><a class="dribbble" href="#"><i class="fa-brands fa-instagram"></i></a></li>
            <li><a class="linkedin" href="#"><i class="fa-brands fa-whatsapp"></i></a></li>   
          </ul>
        </div>
      </div>
    </div>
</footer>
    </div>

  )
}

export default Footer