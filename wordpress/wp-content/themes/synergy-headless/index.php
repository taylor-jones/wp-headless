<?php
// Redirect individual post and pages to the REST API endpoint
if ( is_singular() ) {
	header( sprintf( 'Location: /wp-json/wp/v2/%s/%s', get_post_type_object( get_post_type() )->rest_base, get_post()->ID ) );
} else {
	header( 'Location: /wp-json/' );
}

// if ( is_single() ) {
//     header( 'Location: /wp-json/wp/v2/posts/' . get_post()->ID );
// } elseif ( is_page() ) {
//     header( 'Location: /wp-json/wp/v2/pages/' . get_queried_object()->ID );
// } else {
//     header( 'Location: /wp-json/' );
// }
