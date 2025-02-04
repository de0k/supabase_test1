import { supabase } from "../lib/supabaseClient";

// 모든 게시물 가져오기
export const fetchPosts = async () => {
    const { data, error } = await supabase.from("posts").select("*");

    if (error) {
        console.error("Error fetching posts:", error);
        return [];
    }

    return data;
};


// 게시글 추가
export const addPost = async (title, content) => {
    const { data, error } = await supabase.from("posts").insert([{ title, content }]);

    if (error) {
        console.error("Error adding post:", error);
        return null;
    }

    return data;
};

// 게시글 업데이트
export const updatePost = async (id, title, content) => {
    const { data, error } = await supabase
        .from("posts")
        .update({ title, content })
        .eq("id", id);

    if (error) {
        console.error("Error updating post:", error);
        return null;
    }

    return data;
};

// 게시글 삭제
export const deletePost = async (id) => {
    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
        console.error("Error deleting post:", error);
        return false;
    }

    return true;
};
