"""Initial migration.

Revision ID: 555d489caca6
Revises: 
Create Date: 2022-12-22 18:05:06.884939

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '555d489caca6'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('logs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('logger', sa.String(length=100), nullable=True),
    sa.Column('level', sa.String(length=100), nullable=True),
    sa.Column('trace', sa.String(length=4096), nullable=True),
    sa.Column('msg', sa.String(length=4096), nullable=True),
    sa.Column('support_email_sent', sa.DateTime(), nullable=True),
    sa.Column('created_timestamp', sa.DateTime(), nullable=True),
    sa.Column('pii_key_id', sa.Integer(), server_default='0', nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_logs_created_timestamp'), 'logs', ['created_timestamp'], unique=False)
    op.create_index(op.f('ix_logs_level'), 'logs', ['level'], unique=False)
    op.create_index(op.f('ix_logs_pii_key_id'), 'logs', ['pii_key_id'], unique=False)
    op.create_index(op.f('ix_logs_support_email_sent'), 'logs', ['support_email_sent'], unique=False)
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=200), nullable=False),
    sa.Column('email', sa.String(length=200), nullable=False),
    sa.Column('failed_login_streak', sa.Integer(), server_default='0', nullable=True),
    sa.Column('hashed_password', sa.String(length=128), nullable=False),
    sa.Column('is_deleted', sa.BOOLEAN(), server_default=sa.text('false'), nullable=False),
    sa.Column('created_timestamp', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.Column('pii_key_id', sa.Integer(), server_default='0', nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_index(op.f('ix_users_pii_key_id'), 'users', ['pii_key_id'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_users_pii_key_id'), table_name='users')
    op.drop_table('users')
    op.drop_index(op.f('ix_logs_support_email_sent'), table_name='logs')
    op.drop_index(op.f('ix_logs_pii_key_id'), table_name='logs')
    op.drop_index(op.f('ix_logs_level'), table_name='logs')
    op.drop_index(op.f('ix_logs_created_timestamp'), table_name='logs')
    op.drop_table('logs')
    # ### end Alembic commands ###
