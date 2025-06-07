export default [
  {
    id: 1,
    title: '基礎工程',
    thumbnail: new URL('@/assets/item/1.png', import.meta.url).href,
    video: new URL('@/assets/video/01-基礎工程.mp4', import.meta.url).href,
    pauses: [
      {
        time: 1,
        type: 'drag',
      },

      {
        time: 2,
        type: 'swipeup',
      },
      {
        time: 3,
        type: 'swiperight',
      },
      {
        time: 10,
        type: 'click',
      },
    ],
  },
  {
    id: 2,
    title: 'SC鋼骨構造',
    thumbnail: new URL('@/assets/item/2.png', import.meta.url).href,
    video: new URL('@/assets/video/02-SC鋼骨構造.mp4', import.meta.url).href,
    pauses: [
      {
        time: 8,
        type: 'click',
      },
    ],
  },
  {
    id: 3,
    title: '柱內灌漿',
    thumbnail: new URL('@/assets/item/3.png', import.meta.url).href,
    video: new URL('@/assets/video/03-柱內灌漿.mp4', import.meta.url).href,
    pauses: [
      {
        time: 3,
        type: 'drag',
        icon: 'icons/drag.svg',
      },
    ],
  },
  {
    id: 4,
    title: 'SA鋼筋續接器',
    thumbnail: new URL('@/assets/item/4.png', import.meta.url).href,
    video: new URL('@/assets/video/04-SA鋼筋續接器.mp4', import.meta.url).href,
    pauses: [
      {
        time: 5,
        type: 'click',
      },
    ],
  },
  {
    id: 5,
    title: '窗框防水',
    thumbnail: new URL('@/assets/item/5.png', import.meta.url).href,
    video: new URL('@/assets/video/05-窗框防水.mp4', import.meta.url).href,
    pauses: [
      {
        time: 3,
        type: 'swiperup',
      },
      {
        time: 10,
        type: 'swiperdown',
      },
    ],
  },
  {
    id: 6,
    title: '頂樓防水',
    thumbnail: new URL('@/assets/item/6.png', import.meta.url).href,
    video: new URL('@/assets/video/06-頂樓防水.mp4', import.meta.url).href,
    pauses: [
      {
        time: 2,
        type: 'swiperup',
      },
      {
        time: 9,
        type: 'swiperdown',
      },
    ],
  },

  {
    id: 7,
    title: '浴室防水',
    thumbnail: new URL('@/assets/item/7.png', import.meta.url).href,
    video: new URL('@/assets/video/07-浴室防水.mp4', import.meta.url).href,
    pauses: [
      {
        time: 6,
        type: 'swiperup',
      },
      {
        time: 13,
        type: 'swiperdown',
      },
    ],
  },
  {
    id: 8,
    title: 'YKK氣密窗',
    thumbnail: new URL('@/assets/item/8.png', import.meta.url).href,
    video: new URL('@/assets/video/08-YKK氣密窗.mp4', import.meta.url).href,
    pauses: [
      {
        time: 3,
        type: 'swiperdown',
      },
      {
        time: 8,
        type: 'swiperup',
      },
    ],
  },
  {
    id: 9,
    title: 'STUDOR吸氣閥及當層排氣',
    thumbnail: new URL('@/assets/item/9.png', import.meta.url).href,
    video: new URL('@/assets/video/09-STUDOR吸氣閥及當層排氣.mp4', import.meta.url).href,
    pauses: [
      {
        time: 1,
        type: 'drag',
        icon: 'icons/drag.svg',
      },
      {
        time: 10,
        type: 'drag',
        icon: 'icons/drag.svg',
      },
    ],
  },
  {
    id: 10,
    title: '雨水回收系統',
    thumbnail: new URL('@/assets/item/10.png', import.meta.url).href,
    video: new URL('@/assets/video/10-雨水回收系統.mp4', import.meta.url).href,
    pauses: [
      {
        time: 0,
        type: 'drag',
        icon: 'icons/drag.svg',
      },
      {
        time: 17,
        type: 'click',
      },
      {
        time: 25,
        type: 'click',
      },
      {
        time: 42,
        type: 'click',
      },
      {
        time: 52,
        type: 'click',
      },
    ],
  },
]
