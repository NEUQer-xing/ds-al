<template>
  <section class="slice py-0">
        <div class="container">
            <div class="row row-grid align-items-center">
                <div class="col-12 col-md-5 col-lg-6 order-md-2 text-center ">
                    <div class="card-body p-2">
                        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                            <ol class="carousel-indicators">
                                <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"></li>
                                <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
                                <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
                                <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"></li>
                                <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4"></li> 
                                <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="5"></li>
                            </ol>
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="../assets/img/book/book0.jpg" class="d-block w-100" alt="Slide 1">
                                </div>
                                <div class="carousel-item">
                                    <img src="../assets/img/book/book1.png" class="d-block w-100" alt="Slide 1">
                                </div>
                                <div class="carousel-item">
                                    <img src="../assets/img/book/book2.png" class="d-block w-100" alt="Slide 2">
                                </div>
                                <div class="carousel-item">
                                    <img src="../assets/img/book/book3.png" class="d-block w-100" alt="Slide 3">
                                </div>
                                <div class="carousel-item">
                                    <img src="../assets/img/book/book4.png" class="d-block w-100" alt="Slide 4">
                                </div>
                                <div class="carousel-item">
                                    <img src="../assets/img/book/book5.png" class="d-block w-100" alt="Slide 5">
                                </div>
                            </div>
                            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">上一张</span>
                            </a>
                            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">下一张</span>
                            </a>
                        </div>                       
                    </div>
                </div>
                <div class="col-12 col-md-7 col-lg-6 order-md-1 pr-md-5">
                    <!-- Heading -->
                    <h1 class="display-4 text-center text-md-left mb-3 ">
                        <span>更加形象且高效的学习</span>
                        <strong class="text-primary">
                            <span style="color: #f75200;">数据结构</span>
                            <span style="color: #45a0fc;">和</span>
                            <span style="color: #0354a5">算法</span>
                        </strong>
                    </h1>
                    <!-- Text -->
                    <p class="lead text-center text-md-left text-muted">
                        基于
                        <a href="https://vuejs.org/">Vue3</a>
                        和
                        <a href="https://www.iviewui.com/">ViewDesign</a>
                        的数据结构和算法可视化学习平台
                    </p>
                    <!-- Buttons -->
                    <div class="text-center text-md-left mt-5">
                        <a href="/linearList"
                            class="btn btn-primary btn-icon" target="_blank">
                            <span class="btn-inner--text">立即体验</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle">
                                <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                            </svg>
                        </a>
                        <a href="https://github.com/NEUQer-xing" class="btn btn-neutral btn-icon d-none d-lg-inline-block" target="_blank">
                            <span class="btn-inner--text">关于我</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup >

</script>

<style>
  @import url("@/assets/css/quick-website.css");
</style>