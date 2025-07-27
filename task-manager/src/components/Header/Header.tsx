import type { ReactNode } from "react"

export default function Header(): ReactNode {
  return (
    <div className="row">
      <div className="col-md-6 offset-md-3 col-sm-10 offset-sm-1 text-center">
        <h1 className="my-4">Lab 9.3: Lists, Keys, and Conditionals</h1>
        <hr />
      </div>
    </div>
  )
}
