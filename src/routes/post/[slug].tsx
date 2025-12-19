import Route from "../../app/Post"
import type { RouteSectionProps } from '@solidjs/router'
import { callRouteComponent } from '@ace/callRouteComponent'


export default (props: RouteSectionProps) => callRouteComponent(props, Route)