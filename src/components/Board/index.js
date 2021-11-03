/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import styles from "./styles";
import { SELLER_ROUTES } from "./../../constants";
import { NavLink } from "react-router-dom";
import Menu from "./../../containers/Seller/Menu";

class Board extends Component {
  openNav = () => {
    document.getElementById("myNav").classList.toggle("menu_width");
    document.querySelector(".custom_menu-btn").classList.toggle("menu_btn-style");
  }
  render() {
    const { children, classes } = this.props;
    return (
      <>
        <div className="hero_area">
          <div className="hero_bg_box">
            <img src="images/header.jpg" alt="" />
          </div>
          <header className="header_section">
            <div className="container-fluid">
              <nav className="navbar navbar-expand-lg custom_nav-container">
                <NavLink
                  key={'/home'}
                  to={'/home'}
                  exact={false}
                  className="navbar-brand"
                  activeClassName={classes.menuLinkActive}
                >
                  <span>{'Store'}</span>
                </NavLink>

                <div className="" id="">
                  <div className="container">
                    <div className=" mr-auto flex-column flex-lg-row align-items-center">
                      <ul className="navbar-nav justify-content-between ">
                        <div className="User_option">
                          <li className="">
                            <button className="btn   nav_search-btn" >
                              <i className="fad fa-shopping-cart fa-2x"></i>
                            </button>
                          </li>
                        </div>
                      </ul>
                    </div>
                  </div>

                  <div className="custom_menu-btn">
                    <button onClick={() => this.openNav()}>
                      <span className="s-1"> </span>
                      <span className="s-2"> </span>
                      <span className="s-3"> </span>
                    </button>
                  </div>
                  <div id="myNav" className="overlay">
                    <div className="overlay-content">
                      {SELLER_ROUTES.map((item) => {
                        if (item.path !== '/product') {
                          return (
                            <NavLink
                              key={item.path}
                              to={item.path}
                              exact={item.exact}
                              className={classes.menuLink}
                              activeClassName={classes.menuLinkActive}
                            >
                              {item.name}
                            </NavLink>
                          );
                        }
                      })}

                      <div className="dropdown">
                        <NavLink
                          key={'/home'}
                          exact={false}
                          className={`${classes.button}`}
                          activeClassName={classes.menuLinkActive}
                          type="button" id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Loại sản phẩm
                        </NavLink>
                        <Menu />
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </header>
          <section className="slider_section ">
            <div id="customCarousel1" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="detail-box">
                          <h5>
                            01
                          </h5>
                          <h1>
                            Fresh <br />
                            Vegetables
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item ">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="detail-box">
                          <h5>
                            02
                          </h5>
                          <h1>
                            Fresh <br />
                            Vegetables
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ol className="carousel-indicators">
                <li data-target="#customCarousel1" data-slide-to="0" className="active"></li>
                <li data-target="#customCarousel1" data-slide-to="1"></li>
              </ol>
            </div>
          </section>
        </div>
        {children}
        <section className="about_section ">
          <div className="about_bg_box">
            <img src="images/header.jpg" alt="" />
          </div>
          <div className="container ">
            <div className="row">
              <div className="col-md-6 ml-auto ">
                <div className="detail-box">
                  <div className="heading_container">
                    <h2>
                      We Provide <br />
                      Fresh Vegetables
                    </h2>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad ex, sequi amet similique necessitatibus quas minus repudiandae quae culpa optio ipsum quibusdam praesentium saepe qui dolore voluptate iure sit aut.
                  </p>
                  <a href="" className="mt_20">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="contact_section layout_padding">
          <div className="container">
            <div className="heading_container">
              <h2>
                Liên hệ chúng tôi
              </h2>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form_container contact-form" style={{ fontSize: '15pt' }}>
                  <form action="">
                    <div>
                      <input type="text" placeholder="Họ tên" />
                    </div>
                    <div>
                      <input type="text" placeholder="Số điện thoại" />
                    </div>
                    <div>
                      <input type="email" placeholder="Email" />
                    </div>
                    <div>
                      <input type="text" className="message-box" placeholder="Nội dung" />
                    </div>
                    <div className="btn_box">
                      <button>
                        Gửi
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-6">
                <div className="map_container">
                  <div className="map">
                    <div id="googleMap"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="client_section layout_padding-bottom">
          <div className="container">
            <div className="heading_container heading_center">
              <h2>
                What Says Our Customers
              </h2>
            </div>
            <div className="col-md-9 col-lg-7 mx-auto px-0">
              <div className="box">
                <div className="b-1">
                  <div className="client_id">
                    <div className="img-box">
                      <img src="images/client-1.jpg" alt="" />
                    </div>
                    <div className="name">
                      <h5>
                        Maya Jonas
                      </h5>
                      <h6>
                        Housewife
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="client_detail">
                  <p>
                    It is a long established fact that a reader will be distracted by the readable content of a page when
                    looking at its layout. The point of using Lorem
                  </p>
                </div>
              </div>
              <div className="box">
                <div className="client_id">
                  <div className="img-box">
                    <img src="images/client-2.jpg" alt="" />
                  </div>
                  <div className="name">
                    <h5>
                      Helen Law
                    </h5>
                    <h6>
                      Housewife
                    </h6>
                  </div>
                </div>
                <div className="client_detail">
                  <p>
                    It is a long established fact that a reader will be distracted by the readable content of a page when
                    looking at its layout. The point of using Lorem
                  </p>
                </div>
              </div>
            </div>
            <div className="btn-box">
              <a href="">
                View More
              </a>
            </div>
          </div>
        </section>


        <section className="container-fluid footer_section">
          <div className="container" style={{ fontSize: '13pt' }}>
            <div className="row ">
              <div className="col-sm-6 col-md-6 col-lg-6 footer-col">
                <div className="footer_detail">
                  <a href="index.html">
                    <h4>
                      Eatveg
                    </h4>
                  </a>
                  <p>
                    Soluta odit exercitationem rerum aperiam eos consectetur impedit delectus qui reiciendis, distinctio, asperiores fuga labore a? Magni natus.
                  </p>
                  <div className="social_box">
                    <a href="">
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-linkedin" aria-hidden="true"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-6 mx-auto footer-col">
                <h4>
                  Contact us
                </h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit
                </p>
                <div className="contact_nav">
                  <a href="">
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                    <span>
                      Vị trí
                    </span>
                  </a>
                  <a href="">
                    <i className="fa fa-phone" aria-hidden="true"></i>
                    <span>
                      Điện thoại: +84 907824913
                    </span>
                  </a>
                  <a href="">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    <span>
                      Email : nguyentrungtin913@gmail.com
                    </span>
                  </a>
                </div>
              </div>

            </div>
            <div className="footer-info">
              <p>
                &copy; <span id="displayYear"></span> All Rights Reserved By
                <a href="https://html.design/">Free Html Templates</a>
              </p>
            </div>
          </div>
        </section>

      </>
    );
  }
}

Board.propTypes = {
  children: PropTypes.object,
  classes: PropTypes.object,
  name: PropTypes.string,
  showSidebar: PropTypes.bool,
  uiActionCreators: PropTypes.shape({
    showSidebar: PropTypes.func,
    hideSidebar: PropTypes.func
  })
};

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withStyles(styles))(Board);
