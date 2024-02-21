var token = localStorage.getItem('Authorization');
$(document).ready(function (){
    var invoiceId = sessionStorage.getItem('idInvoice');
    $.ajax({
        type: "GET",
        url: `/api/invoice/${invoiceId}`,
        headers: {
            "Authorization":token,
        },
        dataType: "json",
        success: function (data) {
             var content = `
              <div class="main-page">
        <div class="container">
            <h3 class="title">TICKET INFORMATION</h3>
            <div class="main-info">
                <div class="amy-movie-grid amy-movie-grid-2 ">
                    <div class="amy-movie-list">
                        <div class="amy-movie-items row" data-column="2">
                            <div class="amy-movie-item col-md-12  col-sm-6 col-xs-12">
                                <div class="amy-movie-item-front">
                                    <div class="amy-movie-item-poster">
                                        <a href="amy_tvshow/the-arrows/index.html">
                                            <img width="196" height="336" src="../../resources/img/img_10-1.jpg"
                                                class="attachment-196x336 size-196x336" alt=""
                                                srcset="../../resources/img/img_10-1.jpg"
                                                sizes="(max-width: 196px) 100vw, 196px">
                                        </a>

                                    </div>
                                </div>
                                <div class="amy-movie-item-back" id="amy-movie-item-22252">
                                    <div class="amy-movie-item-back-inner">
                                        <div class="amy-movie-item-content">
                                            <h3><a class="title-film" href="amy_tvshow/the-arrows/index.html">${data.movieName}</a></h3>
                                            <hr>
                                            <div class="row">
                                                <div class="col-xs-12 col-md-6 col-lg-6">
                                                    <label class="label-text">Screen: </label>
                                                </div>
                                                <div class="col-xs-12 col-md-6 col-lg-6">
                                                    <label class="label-info">Scm02</label>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-xs-12 col-md-6 col-lg-6">
                                                    <label class="label-text">Date: </label>
                                                </div>
                                                <div class="col-xs-12 col-md-6 col-lg-6">
                                                    <label class="label-info">${data.scheduleShow}</label>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-xs-12 col-md-6 col-lg-6">
                                                    <label class="label-text">Time: </label>
                                                </div>
                                                <div class="col-xs-12 col-md-6 col-lg-6">
                                                    <label class="label-info">22:00</label>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-xs-12 col-md-6 col-lg-6">
                                                    <label class="label-text">Seat: </label>
                                                </div>
                                                <div class="col-xs-12 col-md-6 col-lg-6">
                                                    <label class="label-info">${data.seat}</label>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-xs-12 col-md-6 col-lg-6">
                                                    <label class="label-text">Price: </label>
                                                </div>
                                                <div class="col-xs-12 col-md-6 col-lg-6">
                                                    <p class="label-info">2D: <b class="price_ticket">45000đ</b></p>
                                                    <p class="label-info">2E: <b class="price_ticket">45000đ</b></p>
                                                    <p class="label-info">2F: <b class="price_ticket">45000đ</b></p>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-xs-12 col-md-6 col-lg-6">
                                                    <label class="label-text">Score for ticket converting: </label>
                                                </div>
                                                <div class="col-xs-12 col-md-6 col-lg-6">
                                                    <label class="label-info">0</label>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-xs-12 col-md-6 col-lg-6">
                                                    <label class="label-text">Total: </label>
                                                </div>
                                                <div class="col-xs-12 col-md-6 col-lg-6">
                                                    <label class="label-total">${data.totalMoney}đ</label>
                                                </div>
                                            </div>
                                            <br>
                                            <h3><a style="${data.account != null?"display:''":"display:none"}" class="title-film" href="amy_tvshow/the-arrows/index.html">Member</a>
                                            </h3>
                                            <hr>
                                            <div style="${data.account != null?"display:''":"display:none"}" class="row">
                                                <div class="col-xs-12 col-md-6 col-lg-6">
                                                    <label class="label-text">Member ID:  </label>
                                                </div>
                                                <div class="col-xs-12 col-md-6 col-lg-6">
                                                    <label class="label-info">${data.account != null ?data.account.id:''}</label>
                                                </div>
                                            </div>
                                            <hr>
                                            <div style="${data.account != null?"display:''":"display:none"}" class="row">
                                                <div class="col-xs-12 col-md-6 col-lg-6">
                                                    <label class="label-text">Identity Card: </label>
                                                </div>
                                                <div class="col-xs-12 col-md-6 col-lg-6">
                                                    <label class="label-info">${data.account != null ?data.account.identityCard:''}</label>
                                                </div>
                                            </div>
                                            <hr>
                                            <div style="${data.account != null?"display:''":"display:none"}" class="row">
                                                <div class="col-xs-12 col-md-6 col-lg-6">
                                                    <label class="label-text">Full Name: </label>
                                                </div>
                                                <div class="col-xs-12 col-md-6 col-lg-6">
                                                    <label class="label-info">${data.account != null ?data.account.fullName:''}</label>
                                                </div>
                                            </div>
                                            <hr>
                                            <div style="${data.account != null?"display:''":"display:none"}" class="row">
                                                <div class="col-xs-12 col-md-6 col-lg-6">
                                                    <label class="label-text">Phone Number: </label>
                                                </div>
                                                <div class="col-xs-12 col-md-6 col-lg-6">
                                                    <label class="label-info">${data.account != null ?data.account.phoneNumber:''}</label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
             `
            $('#content').html(content);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    })
})