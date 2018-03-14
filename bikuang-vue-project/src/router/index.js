import Vue from 'vue'
import Router from 'vue-router'
import Icon from 'vue-awesome/components/Icon'
// import HomePage from '@/components/HomePage'
// import BodyView from '@/components/BodyView'
// import LeftView from '@/components/LeftView'
// import RightView from '@/components/RightView'
// import MainView from '@/components/MainView'

// import PersonPage from '@/components/PersonPage'
// import PersonContentView from '@/components/PersonContentView'
// import PersonLeftView from '@/components/PersonLeftView'
// import PersonRightView from '@/components/PersonRightView'

Vue.use(Router)
Vue.component('body-view', () => import('@/components/BodyView'))
Vue.component('left-view', () => import('@/components/LeftView'))
Vue.component('right-view', () => import('@/components/RightView'))
Vue.component('main-view', () => import('@/components/MainView'))

Vue.component('icon', Icon)

// Vue.component('person-content-view', () => import('@/components/PersonContentView'))
Vue.component('person-left-view', () => import('@/components/PersonLeftView'))
// Vue.component('person-setting-view', () => import('@/components/PersonRightView'))

const HomePage = () => import('@/components/HomePage')
const PersonPage = () => import('@/components/PersonPage')
const ForecastPage = () => import('@/components/ForecastPage')
const QuotesPage = () => import('@/components/QuotesPage')
const DetailFeedPage = () => import('@/components/DetailFeedPage')
const PersonCenterPage = () => import('@/components/PersonCenterPage')

const PersonSettingView = () => import('@/components/PersonSettingView')
const PersonFansView = () => import('@/components/PersonFansView')
const PersonAttentionView = () => import('@/components/PersonAttentionView')
const PersonOpnionView = () => import('@/components/PersonOpnionView')
const PersonCollectionView = () => import('@/components/PersonCollectionView')
const PersonForecastingView = () => import('@/components/PersonForecastingView')

const Search = () => import('@/components/Search')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
     {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/forecast',
      name: 'ForecastPage',
      component: ForecastPage
    },
    {
      path: '/quotes',
      name: 'QuotesPage',
      component: QuotesPage
    },
    {
      path: '/detail',
      name: 'DetailFeedPage',
      component: DetailFeedPage
    },
    {
      path: '/person_center',
      name: 'PersonCenterPage',
      component: PersonCenterPage,
      props: true
    },
    {
    	path: '/person',
    	name: 'PersonPage',
    	component: PersonPage,
      children: [
        {
          name: 'PersonSettingView',
          path: 'setting',
          component: PersonSettingView
        },
        {
          name: 'PersonFansView',
          path: 'fans',
          component: PersonFansView
        },
        {
          name: 'PersonAttentionView',
          path: 'attention',
          component: PersonAttentionView
        },
        {
          name: 'PersonForecastingView',
          path: 'forecast',
          component: PersonForecastingView
        },
        {
          name: 'PersonOpnionView',
          path: 'opnion',
          component: PersonOpnionView
        },
        {
          name: 'PersonCollectionView',
          path: 'collection',
          component: PersonCollectionView
        }
      ]
    }
  ]
})
