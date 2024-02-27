from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import *
from .serializers import ProfileSerializer

import musicbrainzngs

# DJANGO APIVIEWS
class Profile(APIView):
    def get(self, request):
        # Retrieve the current user's profile
        profile = Profile.objects.get(user=request.user)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    def put(self, request):
        # Update the current user's profile
        profile = Profile.objects.get(user=request.user)
        serializer = ProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        # Delete the current user's profile
        profile = Profile.objects.get(user=request.user)
        profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
# MUSICBRAINZ API REQUESTS 
# Returns a list of relevant searches by artist name 
def search_artist(request):
    if request.method == 'GET':
        artist_name = request.GET.get('artist_name')
        if artist_name:
            # Call the function to search for the artist
            musicbrainzngs.set_useragent("recordbin", "0.1", contact="calebmalvarez@gmail.com")
            artist_list = musicbrainzngs.search_artists(artist_name)
            # Remove unwanted keys
            artist_data = [{'mb_id': artist['id'], 'name': artist['name']} for artist in artist_list.get('artist-list', [])]

            if artist_data:
                # Return the data as a JSON response
                return JsonResponse(artist_data, safe=False)
            else:
                return JsonResponse({'error': 'An error occurred while fetching artist data.'}, status=500)
        else:
            return JsonResponse({'error': 'Please provide an artist name.'}, status=400)

# Returns a specific artist by id
def get_artist(request):
    if request.method == 'GET':
        artist_id = request.GET.get('artist_id')
        if artist_id:
            # Call the function to search for the artist
            musicbrainzngs.set_useragent("recordbin", "0.1", contact="calebmalvarez@gmail.com")
            artist_data = musicbrainzngs.get_artist_by_id(artist_id)

            if artist_data:
                # Return the data as a JSON response
                return JsonResponse(artist_data, safe=False)
            else:
                return JsonResponse({'error': 'An error occurred while fetching artist data.'}, status=500)
        else:
            return JsonResponse({'error': 'Please provide an artist id.'}, status=400)

# Returns a specific release by id
def get_release(request):
    if request.method == 'GET':
        release_id = request.GET.get('release_id')
        if release_id:
            # Call the function to search for the artist
            musicbrainzngs.set_useragent("recordbin", "0.1", contact="calebmalvarez@gmail.com")
            release_data = musicbrainzngs.get_release_group_by_id(release_id)

            if release_data:
                # Return the data as a JSON response
                return JsonResponse(release_data, safe=False)
            else:
                return JsonResponse({'error': 'An error occurred while fetching release data.'}, status=500)
        else:
            return JsonResponse({'error': 'Please provide a release id.'}, status=400)

# Returns a list of relevant searches by release title
def search_release(request):
    if request.method == 'GET':
        release_title = request.GET.get('release_title')
        if release_title:
            # Call the function to search for a release
            musicbrainzngs.set_useragent("recordbin", "0.1", contact="calebmalvarez@gmail.com")
            release_list = musicbrainzngs.search_release_groups(release_title)
            # Remove unwanted keys
            release_data = [{'mb_id': release['id'], 'title': release['title'], 'type': release['type']} for release in release_list.get('release-group-list', [])]

            if release_data:
                # Return the data as a JSON response
                return JsonResponse(release_data, safe=False)
            else:
                return JsonResponse({'error': 'An error occurred while fetching release data.'}, status=500)
        else:
            return JsonResponse({'error': 'Please provide a release title.'}, status=400)

# Returns all of the releases under a given artist by id
def releases_by_artist(request):
    if request.method == 'GET':
        artist_id = request.GET.get('artist_id')
        if artist_id:
            # Call MBDB
            musicbrainzngs.set_useragent("recordbin", "0.1", contact="calebmalvarez@gmail.com")
            release_list = musicbrainzngs.browse_release_groups(artist_id)
            # Remove unwanted keys
            release_data = [{'mb_id': release['id'], 'title': release['title'], 'type': release['type']} for release in release_list.get('release-group-list', [])]

            if release_data:
                # Return the data as a JSON response
                return JsonResponse(release_data, safe=False)
            else:
                return JsonResponse({'error': 'An error occurred while fetching release data.'}, status=500)
        else:
            return JsonResponse({'error': 'Please provide an artist id.'}, status=400)