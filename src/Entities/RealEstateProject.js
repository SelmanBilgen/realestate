import supabase from "@/API/supabase";

const RealEstateProject = {
  async list(sort = "created_at") {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order(sort);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },

  async find(id) {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },

  async create(project) {
    const { data, error } = await supabase.from("projects").insert([project]);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },

  async update(id, project) {
    const { data, error } = await supabase
      .from("projects")
      .update(project)
      .eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },

  async delete(id) {
    const { data, error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
};

export { RealEstateProject };