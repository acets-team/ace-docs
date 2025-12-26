import Route from "../app/Partners/Partners"
import type { RouteSectionProps } from '@solidjs/router'
import { callRouteComponent } from '@ace/callRouteComponent'


export default (props: RouteSectionProps) => callRouteComponent(props, Route)