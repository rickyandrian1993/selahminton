import anelloMickeyMouse from '@/assets/products/anelloMickeyMouse.jpg'
import anelloMickeyMouse1 from '@/assets/products/anelloMickeyMouse1.jpg'
import anelloMickeyMouseXDisneyDown from '@/assets/products/anelloMickeyMouseXDisneyDown.jpg'
import anelloMickeyMouseXDisneyUp from '@/assets/products/anelloMickeyMouseXDisneyUp.jpg'
import anelloPinkFushia from '@/assets/products/anelloPinkFushia.jpg'
import cardiganRajutFloriaAbstract from '@/assets/products/cardigan-rajut-floria-abstract.jpg'
import cardiganBelleKnit from '@/assets/products/cardiganBelleKnit.jpg'
import daisyBloomCrochet from '@/assets/products/daisy-bloom-crochet.jpg'
import floralWhimsy from '@/assets/products/floral-whimsy.jpg'
import sailorKnitStripe from '@/assets/products/sailor-knit-stripe.jpg'
import urbanDenim from '@/assets/products/urbanDenim.jpg'
import velloraCardigan from '@/assets/products/vellora-cardigan.jpg'
import vineaKnit from '@/assets/products/vinea-knit.jpg'
import { StaticImageData } from 'next/image'

type TypesAffiliateLink = {
  category: string;
  name: string;
  url: string;
  image: StaticImageData;
};

export const affiliateLinks:TypesAffiliateLink[] = [
  {
    category: 'Cardigans',
    name: 'Outer Urban Denim',
    url: 'https://s.shopee.co.id/70AlNXz6KH',
    image: cardiganBelleKnit
  },
  {
    category: 'Jackets',
    name: 'Outer Urban Denim',
    url: 'https://s.shopee.co.id/1VpopSXFMT',
    image: urbanDenim
  },
  {
    category: 'Cardigans',
    name: 'Vellora Cardigan',
    url: 'https://s.shopee.co.id/2LNlVBcs9U',
    image: velloraCardigan
  },
  {
    category: 'Crops',
    name: 'Daisy Bloom Crochet',
    url: 'https://s.shopee.co.id/4q56U5HHRi',
    image: daisyBloomCrochet
  },
  {
    category: 'Cardigans',
    name: 'Cardigan Rajut Floria Abstract',
    url: 'https://s.shopee.co.id/10sNvO6cpp',
    image: cardiganRajutFloriaAbstract
  },
  {
    category: 'Cardigans',
    name: 'Vinea Knit',
    url: 'https://s.shopee.co.id/Vw7I07hnq',
    image: vineaKnit
  },
  {
    category: 'Cardigans',
    name: 'Floral Whimsy',
    url: 'https://s.shopee.co.id/6AaezrgC68',
    image: floralWhimsy
  },
  {
    category: 'Cardigans',
    name: 'Sailor Knit Stripe',
    url: 'https://s.shopee.co.id/BJRqnOfHn',
    image: sailorKnitStripe
  },
  {
    category: 'Bags',
    name: 'Anello Mickey Mouse X Disney',
    url: 'https://s.shopee.co.id/5ffNnBOMVZ',
    image: anelloMickeyMouseXDisneyUp
  },
  {
    category: 'Bags',
    name: 'Anello Mickey Mouse',
    url: 'https://s.shopee.co.id/8UzZALIqMU',
    image: anelloMickeyMouse1
  },
  {
    category: 'Bags',
    name: 'Anello Pink Fushia',
    url: 'https://s.shopee.co.id/7V71yXUmOQ',
    image: anelloPinkFushia
  },
  {
    category: 'Bags',
    name: 'Anello Mickey Mouse X Disney',
    url: 'https://s.shopee.co.id/9Us6MCEMEx',
    image: anelloMickeyMouseXDisneyDown
  },
  {
    category: 'Bags',
    name: 'Anello Mickey Mouse',
    url: 'https://s.shopee.co.id/10tYEeemJg',
    image: anelloMickeyMouse
  },
]
