class PicturesController < ApplicationController
  def index
    @p_ids = Picture.order("id DESC").map(&:id).join(",")
    render :text => @p_ids
  end

  def new
  end

  def create
    path = 'public/images'
    picture = Picture.create
    File.open("#{Rails.root}/#{path}/#{picture.id}.png", "wb") do |f|
      f.write Base64.decode64(params[:data].sub!('data:image/png;base64,', ''))
    end
    if Picture.count > 50
      picture = Picture.order(:id).first
      begin
        File.unlink("#{Rails.root}/#{path}/#{picture.id}.png", "wb")
      rescue
      end
      picture.destroy
    end
    render :nothing => true
  end
end
