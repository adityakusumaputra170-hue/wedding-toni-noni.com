// Inisialisasi variabel global
document.addEventListener('DOMContentLoaded', function() {
    // Elemen DOM
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    const openInvitationBtn = document.getElementById('open-invitation');
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const countdownDays = document.getElementById('days');
    const countdownHours = document.getElementById('hours');
    const countdownMinutes = document.getElementById('minutes');
    const countdownSeconds = document.getElementById('seconds');
    const rsvpForm = document.getElementById('rsvp-form');
    const galleryGrid = document.querySelector('.gallery-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const submitWishBtn = document.getElementById('submit-wish');
    
    // Data galeri (4 foto sesuai permintaan)
    const galleryImages = [
        { 
             src: 'assets/images/gallery/Liburan.jpg.jpg', 
            caption: 'Foto Liburan - Saat kami berlibur ke pantai bersama' 
        },
        { 
            src: 'assets/images/gallery/iya.jpg.jpg', 
            caption: 'Foto Makan Bersama - Momen makan malam romantis pertama kami' 
        },
        { 
            src: 'assets/images/gallery/gitu.jpg.jpg',
            caption: 'Foto Bersama Keluarga - Perayaan ulang tahun bersama keluarga besar' 
        },
        { 
            src: 'assets/images/gallery/gini.jpg.jpg', 
            caption: 'Foto Lamaran - Detik-detik penuh haru saat lamaran' 
        },
        { 
            src: 'assets/images/gallery/kayaknya.jpg.jpg', 
            caption: 'Foto Lamaran - Detik-detik penuh haru saat lamaran' 
        },
        { 
            src: 'assets/images/gallery/gatau.jpg.jpg', 
            caption: 'Foto Lamaran - Detik-detik penuh haru saat lamaran' 
        }
    ];
    
    let currentImageIndex = 0;
    let isMusicPlaying = false;
    let isUnlocked = false;
    
    // SETEL VOLUME DEFAULT KE 30% AGAR TIDAK TERLALU KERAS
    bgMusic.volume = 0.3;
    
    // Fungsi untuk unlock scroll DAN autoplay musik
    function unlockScroll() {
        if (!isUnlocked) {
            body.classList.remove('locked');
            isUnlocked = true;
            
            // Tampilkan navbar dengan animasi
            setTimeout(() => {
                navbar.classList.add('visible');
            }, 500);
            
            // AUTOPLAY MUSIK SETELAH INTERAKSI PENGguna
            autoplayMusic();
            
            // Animasi floral tambahan
            animateFloralElements();
        }
    }
    
    // Fungsi untuk autoplay musik
    function autoplayMusic() {
        if (!isMusicPlaying) {
            // Coba autoplay dengan promise
            const playPromise = bgMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // Autoplay berhasil
                    isMusicPlaying = true;
                    musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                    musicToggle.classList.add('playing');
                    console.log("Musik berhasil diputar otomatis");
                    
                    // Tampilkan notifikasi
                    showMusicNotification();
                }).catch(error => {
                    // Autoplay diblokir browser
                    console.log("Autoplay diblokir, menunggu interaksi lebih lanjut");
                    // Tampilkan notifikasi di tombol musik
                    musicToggle.innerHTML = '<i class="fas fa-play"></i>';
                    musicToggle.title = "Klik untuk memutar musik";
                });
            }
        }
    }
    
    // Fungsi untuk animasi elemen floral
    function animateFloralElements() {
        const floralElements = document.querySelectorAll('.floral-decoration, .floral-float, .floral-wish, .floral-footer, .floral-frame i, .floral-petals i');
        floralElements.forEach((element, index) => {
            // Reset animation
            element.style.animation = 'none';
            void element.offsetWidth; // Trigger reflow
            // Start animation with delay
            setTimeout(() => {
                element.style.animation = `floralFloat ${4 + Math.random() * 6}s ease-in-out infinite`;
            }, index * 150);
        });
    }
    
    // Fungsi untuk toggle menu navigasi di HP
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
        this.classList.toggle('active');
    });
    
    // Fungsi untuk close menu ketika klik link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            navToggle.classList.remove('active');
        });
    });
    
    // Fungsi untuk sticky navbar dengan efek smooth
    window.addEventListener('scroll', function() {
        if (!isUnlocked) return;
        
        if (window.scrollY > 100) {
            navbar.style.padding = '8px 0';
            navbar.style.boxShadow = '0 10px 40px rgba(10, 50, 52, 0.5)';
        } else {
            navbar.style.padding = '12px 0';
            navbar.style.boxShadow = '0 10px 40px rgba(10, 50, 52, 0.3)';
        }
    });
    
    // Fungsi untuk tombol "Buka Undangan" - SEKARANG JUGA AUTOPLAY MUSIK
    openInvitationBtn.addEventListener('click', function() {
        unlockScroll();
        
        // Scroll ke section pasangan
        setTimeout(() => {
            document.getElementById('pasangan').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }, 400);
        
        // Tambah kelas untuk animasi
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });
    
    // Fungsi untuk menampilkan notifikasi musik diputar
    function showMusicNotification() {
        // Hapus notifikasi sebelumnya jika ada
        const existingNotification = document.querySelector('.music-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Buat elemen notifikasi
        const notification = document.createElement('div');
        notification.className = 'music-notification';
        notification.innerHTML = `
            <i class="fas fa-volume-up"></i>
            <span>Musik latar telah diputar. Klik ikon musik di pojok kanan bawah untuk kontrol.</span>
        `;
        document.body.appendChild(notification);
        
        // Hilangkan notifikasi setelah 5 detik
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 500);
        }, 5000);
    }
    
    // Fungsi untuk toggle musik
    musicToggle.addEventListener('click', function() {
        if (isMusicPlaying) {
            bgMusic.pause();
            this.innerHTML = '<i class="fas fa-play"></i>';
            this.classList.remove('playing');
        } else {
            bgMusic.play().then(() => {
                this.innerHTML = '<i class="fas fa-pause"></i>';
                this.classList.add('playing');
                isMusicPlaying = true;
            }).catch(error => {
                console.log("Gagal memutar musik: ", error);
                // Tampilkan pesan error
                this.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
                this.title = "Gagal memutar musik. Coba refresh halaman.";
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-play"></i>';
                    this.title = "";
                }, 2000);
            });
        }
        isMusicPlaying = !isMusicPlaying;
    });
    
    // Fungsi hitung mundur
    function updateCountdown() {
        const targetDate = new Date('February 3, 2026 08:00:00').getTime();
        const now = new Date().getTime();
        const timeLeft = targetDate - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            // Animasi flip untuk perubahan angka
            if (countdownDays.textContent !== days.toString().padStart(2, '0')) {
                animateCountdownValue(countdownDays, days);
            }
            if (countdownHours.textContent !== hours.toString().padStart(2, '0')) {
                animateCountdownValue(countdownHours, hours);
            }
            if (countdownMinutes.textContent !== minutes.toString().padStart(2, '0')) {
                animateCountdownValue(countdownMinutes, minutes);
            }
            animateCountdownValue(countdownSeconds, seconds);
        } else {
            // Waktu sudah habis
            countdownDays.textContent = '00';
            countdownHours.textContent = '00';
            countdownMinutes.textContent = '00';
            countdownSeconds.textContent = '00';
        }
    }
    
    // Fungsi untuk animasi angka countdown
    function animateCountdownValue(element, value) {
        element.style.animation = 'none';
        void element.offsetWidth; // Trigger reflow
        element.style.animation = 'countdownFlip 0.5s ease';
        element.textContent = value.toString().padStart(2, '0');
    }
    
    // Jalankan countdown setiap detik
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Fungsi untuk form konfirmasi
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Ambil data form
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simulasi pengiriman data (biasanya ke backend)
        console.log('Data konfirmasi:', data);
        
        // Tampilkan pesan sukses
        alert('Terima kasih! Konfirmasi kehadiran Anda telah berhasil dikirim.');
        
        // Reset form
        this.reset();
    });
    
    // Fungsi untuk membuat galeri
    function createGallery() {
        galleryImages.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.caption}" loading="lazy">
                <div class="gallery-overlay"></div>
            `;
            
            galleryItem.addEventListener('click', () => openLightbox(index));
            galleryGrid.appendChild(galleryItem);
        });
    }
    
    // Fungsi untuk membuka lightbox
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Fungsi untuk update lightbox
    function updateLightbox() {
        const image = galleryImages[currentImageIndex];
        lightboxImage.src = image.src;
        lightboxImage.alt = image.caption;
        lightboxCaption.textContent = image.caption;
    }
    
    // Fungsi untuk navigasi lightbox
    function navigateLightbox(direction) {
        currentImageIndex += direction;
        
        // Loop ke awal/akhir
        if (currentImageIndex < 0) {
            currentImageIndex = galleryImages.length - 1;
        } else if (currentImageIndex >= galleryImages.length) {
            currentImageIndex = 0;
        }
        
        updateLightbox();
    }
    
    // Event listener untuk lightbox
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));
    
    // Event listener untuk keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox(-1);
        } else if (e.key === 'ArrowRight') {
            navigateLightbox(1);
        }
    });
    
    // Event listener untuk swipe di HP
    let touchStartX = 0;
    let touchEndX = 0;
    
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe kiri
                navigateLightbox(1);
            } else {
                // Swipe kanan
                navigateLightbox(-1);
            }
        }
    }
    
    // Fungsi untuk form ucapan
    submitWishBtn.addEventListener('click', function() {
        const name = document.getElementById('wish-name').value.trim();
        const message = document.getElementById('wish-message').value.trim();
        
        if (!name || !message) {
            alert('Mohon isi nama dan ucapan terlebih dahulu.');
            return;
        }
        
        // Simulasi penyimpanan ucapan
        const wish = { name, message, date: new Date().toLocaleDateString('id-ID') };
        console.log('Ucapan baru:', wish);
        
        // Tampilkan pesan sukses
        alert('Terima kasih! Ucapan Anda telah berhasil dikirim.');
        
        // Reset form
        document.getElementById('wish-name').value = '';
        document.getElementById('wish-message').value = '';
    });
    
    // Fungsi untuk animasi scroll reveal
    function revealOnScroll() {
        // Untuk story items
        const storyItems = document.querySelectorAll('.story-item');
        storyItems.forEach(item => {
            const windowHeight = window.innerHeight;
            const elementTop = item.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 150) {
                item.classList.add('visible');
            }
        });
        
        // Untuk elemen reveal lainnya
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 200;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // listener untuk scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Inisialisasi
    createGallery();
    revealOnScroll(); // Jalankan sekali untuk elemen yang sudah terlihat
    
    // Tambahkan kelas reveal untuk animasi
    document.querySelectorAll('.couple-card, .event-card, .countdown-box, .bank-card').forEach((el, index) => {
        el.classList.add('reveal');
        el.classList.add(index % 2 === 0 ? 'reveal-left' : 'reveal-right');
    });
    
    // Preload gambar untuk performa lebih baik
    function preloadImages() {
        galleryImages.forEach(image => {
            const img = new Image();
            img.src = image.src;
        });
        
        // Preload foto cerita cinta
        const storyPhotos = [
            'https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ];
        
        storyPhotos.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    preloadImages();
    
    // Optimasi performa untuk animasi
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!isUnlocked) return;
        
        lastScrollY = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                revealOnScroll();
                ticking = false;
            });
            
            ticking = true;
        }
    });
    
    // Tambahkan event listener untuk mencegah scroll dengan keyboard saat locked
    document.addEventListener('keydown', function(e) {
        if (!isUnlocked && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === ' ' || e.key === 'PageDown' || e.key === 'PageUp')) {
            e.preventDefault();
        }
    });
    
    // Tambahkan event listener untuk mencegah scroll dengan mouse wheel saat locked
    document.addEventListener('wheel', function(e) {
        if (!isUnlocked) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Animasi awal untuk elemen floral
    setTimeout(() => {
        animateFloralElements();
    }, 800);
});