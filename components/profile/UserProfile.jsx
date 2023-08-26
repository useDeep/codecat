import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const UserProfile = ( {user} ) => {
  
  const dateString= user?.exp
  const options = { year: "numeric", month: "long", day: "numeric" }
  const date= new Date(dateString).toLocaleString('en-US', options)
  return (
    <div className="flex flex-col justify-center items-center bg-transperant">
  <Avatar className="h-40 w-40 border-white border-4">
  <AvatarImage src={user?.picture} />
  <AvatarFallback
    className="text-2xl"
  >CC</AvatarFallback>
</Avatar>
    <h1
      className="text-2xl font-bold mt-5"
    >{user?.name}</h1>
    <h1
      className="text-slate-700 mt-4"
    >{user?.email}</h1>
    <p className="mt-3">Since: <span>{date}</span></p>

</div>

  )
}

export default UserProfile