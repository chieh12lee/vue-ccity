const swipeIcon = new URL('@/assets/標示-滑動.webm', import.meta.url).href
const icons = {
  click: new URL('@/assets/標示-點擊.webm', import.meta.url).href,
  swipe: swipeIcon,
  swipeup: swipeIcon,
  swipedown: swipeIcon,
  swiperight: swipeIcon,
  swipeleft: swipeIcon,
}
const dragPos = { x: 1620, y: 300 }
const centerPos = { x: 910, y: 490 }

export default [
  {
    id: 1,
    title: '基礎工程',
    thumbnail: new URL('@/assets/item/1.png', import.meta.url).href,
    video: new URL('@/assets/video/01-基礎工程.mp4', import.meta.url).href,
    pauses: [
      {
        time: 7,
        type: 'click',
        icon: {
          url: icons.click,
          pos: { x: 1490, y: 655 },
        },
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
        time: 9,
        type: 'click',
        icon: {
          url: icons.click,
          pos: { x: 894, y: 528 },
        },
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
        icon: {
          url: new URL('./assets/icon-柱內灌漿.webm', import.meta.url).href,
          pos: dragPos,
        },
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
        time: 6,
        type: 'click',
        icon: {
          url: icons.click,
          pos: { x: 899, y: 530 },
        },
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
        type: 'swiperight',
        icon: {
          url: icons.swipe,
          pos: { x: 910, y: 490 },
          deg: 0,
        },
      },
      {
        time: 10,
        type: 'swipeleft',
        icon: {
          url: icons.swipe,
          pos: { x: 910, y: 490 },
          deg: 180,
        },
      },

      {
        time: 15,
        type: 'swiperight',
        icon: {
          url: icons.swipe,
          pos: { x: 910, y: 490 },
          deg: 0,
        },
        onCompleted: (video) => {
          video.jump(0)
        },
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
        type: 'swipe',
        icon: {
          url: icons.swipe,
          pos: { x: 880, y: 510 },
          deg: -130,
        },
      },
      {
        time: 9,
        type: 'swipe',
        icon: {
          url: icons.swipe,
          pos: { x: 880, y: 510 },
          deg: 54,
        },
      },
      {
        time: 13,
        type: 'swipe',
        icon: {
          url: icons.swipe,
          pos: { x: 880, y: 510 },
          deg: -130,
        },
        onCompleted: (video) => {
          video.jump(0)
        },
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
        type: 'swipeup',

        icon: {
          url: icons.swipe,
          pos: { x: 840, y: 750 },
          deg: -90,
        },
      },
      {
        time: 14,
        type: 'swipedown',
        icon: {
          url: icons.swipe,
          pos: { x: 840, y: 720 },
          deg: 90,
        },
      },
      {
        time: 19,
        type: 'swipeup',
        icon: {
          url: icons.swipe,
          pos: { x: 840, y: 750 },
          deg: -90,
        },
        onCompleted: (video) => {
          video.jump(0)
        },
      },
    ],
  },
  {
    id: 8,
    title: 'YKK氣密窗',
    thumbnail: new URL('@/assets/item/8.png', import.meta.url).href,
    video: new URL('@/assets/video/08-YKK氣密窗.mp4', import.meta.url).href,
    audio: new URL('@/assets/video/08-YKK氣密窗.mp3', import.meta.url).href,
    muted: true,
    onDblclick: (video, audio) => {
      audio.pause()
      video.seek(16)
    },
    pauses: [
      {
        time: 5.5,
        type: 'swipeleft',
        icon: {
          url: icons.swipe,
          pos: { x: 1340, y: 354 },
          deg: -180,
        },
        onCompleted: (video, audio) => {
          video.play()
          setTimeout(() => {
            audio.pause()
          }, 1500)
        },
      },
      {
        time: 9,
        type: 'swiperight',
        icon: {
          url: icons.swipe,
          pos: { x: 1340, y: 354 },
          deg: 0,
        },
        onCompleted: (video, audio) => {
          video.play()
          setTimeout(() => {
            audio.play()
          }, 500)
        },
      },
      {
        time: 12,
        type: 'swipeleft',
        icon: {
          url: icons.swipe,
          pos: { x: 1340, y: 354 },
          deg: -180,
        },
        onCompleted: (video, audio) => {
          video.jump(0)
          setTimeout(() => {
            audio.pause()
          }, 2500)
        },
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
        icon: {
          url: new URL('./assets/icon-吸氣閥.webm', import.meta.url).href,
          pos: dragPos,
        },
      },
      {
        time: 11,
        type: 'click',
        icon: {
          url: icons.click,
          pos: { x: 600, y: 700 },
        },
      },
    ],
  },
  {
    id: 10,
    title: '雨水回收系統',
    thumbnail: new URL('@/assets/item/10.png', import.meta.url).href,
    video: new URL('@/assets/video/10-雨水回收系統.mp4', import.meta.url).href,
    audio: new URL('@/assets/video/10-雨水回收系統.mp3', import.meta.url).href,
    pauses: [
      {
        time: 0,
        type: 'drag',
        icon: {
          url: new URL('./assets/icon-下雨.webm', import.meta.url).href,
          pos: dragPos,
        },
      },
      {
        time: 18,
        type: 'click',
        icon: {
          url: icons.click,
          pos: { x: 910, y: 700 },
        },
      },
      {
        time: 26,
        type: 'click',

        icon: {
          url: icons.click,
          pos: { x: 910, y: 610 },
        },
      },
      {
        time: 46,
        type: 'click',
        icon: {
          url: icons.click,
          pos: { x: 910, y: 610 },
        },
      },
      {
        time: 53,
        type: 'click',
        icon: {
          url: icons.click,
          pos: { x: 910, y: 550 },
        },
      },
    ],
  },
]
