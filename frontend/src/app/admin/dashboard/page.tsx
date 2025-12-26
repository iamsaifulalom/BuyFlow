"use client"
import { useSidebar } from '@/shared/components/sidebar'
import { MenuIcon } from 'lucide-react'

export default function AdminDashboard() {
  const { toggleSidebar } = useSidebar()
  return (
    <div className='items-center gap-10' >
      <MenuIcon onClick={toggleSidebar} /> <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita alias maiores molestiae. Eius a deleniti at soluta aut nobis, distinctio iure, voluptate quaerat id error quas ipsum, ut excepturi debitis. Temporibus ducimus deserunt fuga quos nemo! Temporibus quas harum, voluptate nesciunt dolor quisquam aspernatur, accusantium explicabo saepe voluptas cum numquam doloremque fuga autem, eum modi! Excepturi sapiente odio quo. Ex laborum odit cum veritatis? Dignissimos explicabo consequuntur cupiditate libero repudiandae. A officiis consequatur earum in modi, neque illum laboriosam ipsam autem commodi, labore distinctio asperiores atque suscipit vel, pariatur inventore! Assumenda commodi iusto quidem. Harum, doloremque placeat. Nihil quisquam debitis ducimus voluptates ab aliquid modi fugit pariatur molestiae corrupti vel, dicta possimus molestias similique reprehenderit minima. A ipsa quas quaerat, rem temporibus dolorem error obcaecati nemo illum corrupti hic et eos ex soluta magni laboriosam qui recusandae consequuntur consequatur tenetur nobis incidunt eius sit deleniti! Nesciunt explicabo reiciendis laudantium, assumenda dolore velit illum eveniet magnam, adipisci, ex repellendus. Recusandae voluptatum, soluta rem in porro harum molestiae modi illum consequatur ratione ipsam distinctio tenetur mollitia totam laborum ut! Mollitia ut minus, inventore tempore aperiam sequi ipsam ducimus eos reiciendis consequatur voluptate praesentium nostrum sit vel exercitationem reprehenderit nam incidunt! Rerum, eaque?
    </div>
  )
}
