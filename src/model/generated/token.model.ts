import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import {Transfer} from "./transfer.model"

@Entity_()
export class Token {
    constructor(props?: Partial<Token>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("text", {nullable: false})
    owner!: string

    @Column_("text", {nullable: true})
    uri!: string | undefined | null

    @OneToMany_(() => Transfer, e => e.token)
    transfers!: Transfer[]
}
