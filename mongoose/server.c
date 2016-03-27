// Copyright (c) 2015 Cesanta Software Limited
// All rights reserved

#include "mongoose.h"

// HTTP PORT
const char *s_http_port = "8000";
static struct mg_serve_http_opts s_http_server_opts;

// Define the static "endpoints"
static const struct mg_str root = MG_STR("");
static const struct mg_str player_home = MG_STR("/player");
static const struct mg_str player_music = MG_STR("/player/music");
static const struct mg_str player_tv = MG_STR("/player/tv");
static const struct mg_str player_movies = MG_STR("/player/movies");
static const struct mg_str player_photos = MG_STR("/player/photos");

static const struct mg_str root_suffix = MG_STR("/player/home.html");
static const struct mg_str player_home_suffix = MG_STR("/home.html");
static const struct mg_str player_music_suffix = MG_STR(".html");
static const struct mg_str player_tv_suffix = MG_STR(".html");
static const struct mg_str player_movies_suffix = MG_STR(".html");
static const struct mg_str player_photos_suffix = MG_STR(".html");

// mg_str helper functions
static int is_equal(const struct mg_str *s1, const struct mg_str *s2) {
  return s1->len == s2->len && memcmp(s1->p, s2->p, s2->len) == 0;
}

static void uri_append(struct http_message* hm, const struct mg_str s) {
  struct mg_str uri;
  char* p = malloc(hm->uri.len + s.len);
  memcpy(p, hm->uri.p, hm->uri.len);
  memcpy((p+hm->uri.len), s.p, s.len);
  uri.p = p;
  uri.len = (hm->uri.len + s.len);
  hm->uri = uri;
}

static void ev_handler(struct mg_connection *nc, int ev, void *p) {


  if (ev == MG_EV_HTTP_REQUEST) {
    struct http_message* hm = (struct http_message*) p;

    // Remove trailing slashes from a uri
    if(*(hm->uri.p + hm->uri.len - sizeof(char)) == '/'){
      struct mg_str uri;
      char* p = malloc(hm->uri.len - sizeof(char));
      memcpy(p, hm->uri.p, hm->uri.len - sizeof(char));
      uri.p = p;
      uri.len = hm->uri.len - sizeof(char);
      hm->uri = uri;
    }

    // Append .html to any of the static endpoints
    if (is_equal(&hm->uri, &root)) {
      uri_append(hm, root_suffix);
    } else if (is_equal(&hm->uri, &player_home)) {
      uri_append(hm, player_home_suffix);
    } else if (is_equal(&hm->uri, &player_music)) {
      uri_append(hm, player_music_suffix);
    } else if (is_equal(&hm->uri, &player_tv)) {
      uri_append(hm, player_tv_suffix);
    } else if (is_equal(&hm->uri, &player_movies)) {
      uri_append(hm, player_movies_suffix);
    } else if (is_equal(&hm->uri, &player_photos)) {
      uri_append(hm, player_photos_suffix);
    }

    // Log the request
    fprintf(stderr,"%.*s %.*s\n", (int) hm->method.len, hm->method.p, (int) hm->uri.len, hm->uri.p);
    mg_serve_http(nc, hm, s_http_server_opts);
  }
}

int main(void) {
  struct mg_mgr mgr;
  struct mg_connection *nc;

  mg_mgr_init(&mgr, NULL);
  nc = mg_bind(&mgr, s_http_port, ev_handler);

  if(!nc){
    fprintf(stderr, "Unable to bind to port %s\n", s_http_port);
    return 1;
  }

  // Set up HTTP server parameters
  const char* doc_root = (const char*) getenv("DOCUMENTROOT");

  if(!doc_root){
    fprintf(stderr, "DOCUMENTROOT not set!\n");
    return 1;
  }

  mg_set_protocol_http_websocket(nc);
  s_http_server_opts.document_root = doc_root;
  s_http_server_opts.enable_directory_listing = "no";

  fprintf(stderr, "Serving %s on port %s\n", doc_root, s_http_port);
  for (;;) {
    mg_mgr_poll(&mgr, 1000);
  }
  mg_mgr_free(&mgr);

  return 0;
}
