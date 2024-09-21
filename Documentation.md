1. Nextjs setup
2. shacn-ui setup
3. Adding customizable button component
4. Seting Up Prisma
5. Writing prisma schema - Learned about disambiguting relation
6. Adding Authentication - Google Privider, Username, Password
7. Adding toast component of shadcn ui
8. Creating Backend routes
  a. /items - GET route - get item eg: /api/item?user&&listed&&search&&category
  b. /items - POST route - create item

9. Create the ui of Navbar
10. Login and Signup component
11. Adding sorting, category
12. Listing all items on the page in card design
13. pagination
14. Specific item page
15. Review comment Component to see items ratings and comments
16. Create a page to give rating to the seller
17. Create a page to give rating to the item.

First we will build backend

const item = body as Omit<Item, "timestamp" | "id" | "shopId" | "owner">;

window.location.href
window.location.hostname
window.location.pathname
window.location.protocol

<Select
  value={category?.value}
  onValueChange={(value) => {
    if(value === category?.value) {
      setCategory(null)
    } else {
      setCategory(convertValueToCategory(value))
    }
  }}
>

Use controlled components so use value attribute

 <select value={selectedValue} onChange={handleSelectChange}>
  <option value="">Choose an option</option>
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
  <option value="cherry">Cherry</option>
</select>


TODO
1. Handle the app when user gets into route which is not defined give a proper page not found


Error
1. Error Do not know how to serialize a BigInt it occurs because I haved used BigInt datetype in prisma
and JavaScript’s BigInt type cannot be serialized to JSON because JSON doesn't support BigInt directly.

