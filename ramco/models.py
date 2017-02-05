__author__ = 'vince'
from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes import generic

#RAMCO Models

class Profile(models.Model):
    user = models.ForeignKey(User, unique=True)
    confirmation_code = models.CharField(max_length=50)
    nbrNotifs = models.IntegerField(default=0)
    nbrNotMyCode = models.IntegerField(default=0)
    nbrNotMyReq = models.IntegerField(default=0)
    nbrNotCrossR = models.IntegerField(default=0)
    
    
class Language(models.Model):
    Name = models.CharField(max_length=15)
    def __unicode__(self):
        return self.Name
    
class Tags(models.Model):
    Name = models.CharField(max_length=15)
    def __unicode__(self):
        return self.Name


class Submission(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    language = models.ForeignKey(Language)
    code = models.CharField(max_length=5000) #a changer, maybe more
    date = models.DateField(auto_now=True)
    user = models.ForeignKey(User)
    meanRating = models.DecimalField(default=0, decimal_places=2, max_digits=4)
    nbrComments = models.IntegerField(default=0)
    ownerNotif = models.BooleanField(default=False)
    
    
REQUEST_STATES = (
    ('1', 'Open'),
    ('2', 'Closed'),
    ('3', 'CrossRating'),
)

REQUEST_CLOSING_TYPE = (
    ('1', 'number_of_users'),
    ('2', 'end_date'),
    ('3', 'user_list'),            
)

class Request(models.Model):
    title = models.CharField(max_length=50)
    date = models.DateField(auto_now=True)
    description = models.CharField(max_length=500)
    language = models.ForeignKey(Language)
    user = models.ForeignKey(User)
    code = models.CharField(max_length=5000, blank=True, null=True)
    nbrOfRequiredSubs = models.IntegerField(blank=True, null=True)
    nbrOfReplies = models.IntegerField(default=0)
    endDate = models.DateField(blank=True, null=True)
    key = models.CharField(max_length=50, blank=True, null=True)
    userList = models.ManyToManyField(User, related_name="userList", blank=True, null=True)
    state = models.CharField(max_length=1, choices=REQUEST_STATES, default=1)
    closing_type = models.CharField(max_length=1, choices=REQUEST_CLOSING_TYPE)
    ownerNotif = models.BooleanField(default=False)
    class Meta:
        permissions = (
            ("view", "Can see the request"),
        )
    
class TaggedReview(models.Model):
    tag = models.SlugField()
    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()
    content_object = generic.GenericForeignKey('content_type', 'object_id')
    def __unicode__(self):
        return self.tag

class Review(models.Model):
    rating = models.IntegerField(default=0)
    date = models.DateField(auto_now=True)
    comment = models.CharField(max_length=1000)
    code = models.CharField(max_length=5000, blank=True, null=True) #a changer, maybe more
    user = models.ForeignKey(User)
    submission = models.ForeignKey(Submission)
    tagsList = generic.GenericRelation(TaggedReview)


class RequestAnswer(models.Model):
    user = models.ForeignKey(User)
    date = models.DateField(auto_now=True)
    code = models.CharField(max_length=5000) #a changer, maybe more
    request = models.ForeignKey(Request)

class CrossRating(models.Model):
    user = models.ForeignKey(User)
    req = models.ForeignKey(Request)
    reqAnswer = models.ForeignKey(RequestAnswer)
    wasRate = models.BooleanField(default=False) 

class CRRating(models.Model):
    reqAnswer = models.ForeignKey(RequestAnswer)
    rating = models.IntegerField(default=0)
    date = models.DateField(auto_now=True)
    comment = models.CharField(max_length=1000)
    user = models.ForeignKey(User)
    tagsList = generic.GenericRelation(TaggedReview)
    notifOwn = models.BooleanField(default=False)

class LineCommentManager(models.Manager):
    def create_lineComment(self, submission,review,line_n,line_comment, crrating):
        lComment = self.create(submission=submission,review=review,line_n=line_n, line_comment=line_comment, crrating=crrating)
        return lComment

class LineComment(models.Model):
    submission = models.ForeignKey(Submission, blank=True, null=True)
    crrating = models.ForeignKey(CRRating, blank=True, null=True)
    review = models.ForeignKey(Review,blank=True, null=True)
    line_n = models.IntegerField()
    line_comment = models.CharField(max_length=5000)
    objects = LineCommentManager()
